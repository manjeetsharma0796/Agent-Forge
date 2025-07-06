module agent_token::agent {
    use std::signer;
    use std::string;
    use std::option::{Self, Option};
    use aptos_framework::coin::{Self, Coin, MintCapability, BurnCapability};
    use aptos_framework::account;
    // use 0x1a2b3c4d::router; // Removed: router module not available
    use 0x1::aptos_coin::AptosCoin;

    const E_NOT_OWNER: u64 = 1;
    const E_INSUFFICIENT_BALANCE: u64 = 2;
    const E_NOT_INITIALIZED: u64 = 3;

    struct AgentToken has key {}

    struct Capabilities has key {
        mint_cap: MintCapability<AgentToken>,
        burn_cap: BurnCapability<AgentToken>,
        owner: address,
    }

    public entry fun initialize(admin: &signer) acquires Capabilities {
        let admin_addr = signer::address_of(admin);

        let (burn_cap, freeze_cap, mint_cap) = coin::initialize<AgentToken>(
            admin,
            string::utf8(b"AgentToken"),
            string::utf8(b"LG"),
            8,
            true,
        );

        move_to(admin, Capabilities {
            mint_cap,
            burn_cap,
            owner: admin_addr,
        });

        coin::destroy_freeze_cap(freeze_cap);
        coin::register<AgentToken>(admin);

        let caps = borrow_global<Capabilities>(@agent_token);
        let initial_coins = coin::mint<AgentToken>(10000000000, &caps.mint_cap);
        coin::deposit<AgentToken>(admin_addr, initial_coins);
    }

    public entry fun mint(admin: &signer, to: address, amount: u64) acquires Capabilities {
        let admin_addr = signer::address_of(admin);
        let caps = borrow_global<Capabilities>(@agent_token);
        assert!(admin_addr == caps.owner, E_NOT_OWNER);

        let coins = coin::mint<AgentToken>(amount, &caps.mint_cap);
        coin::deposit<AgentToken>(to, coins);
    }

    public entry fun transfer(from: &signer, to: address, amount: u64) {
        let from_addr = signer::address_of(from);
        assert!(coin::balance<AgentToken>(from_addr) >= amount, E_INSUFFICIENT_BALANCE);
        coin::transfer<AgentToken>(from, to, amount);
    }

    public entry fun donate(from: &signer, to: address, amount: u64) {
        transfer(from, to, amount);
    }

    public entry fun register(account: &signer) {
        coin::register<AgentToken>(account);
    }

    // 📦 View functions

    #[view]
    public fun balance(addr: address): u64 {
        coin::balance<AgentToken>(addr)
    }

    #[view]
    public fun name(): string::String {
        coin::name<AgentToken>()
    }

    #[view]
    public fun symbol(): string::String {
        coin::symbol<AgentToken>()
    }

    #[view]
    public fun decimals(): u8 {
        coin::decimals<AgentToken>()
    }

    #[view]
    public fun total_supply(): Option<u128> {
        coin::supply<AgentToken>()
    }

    #[view]
    public fun is_registered(addr: address): bool {
        coin::is_account_registered<AgentToken>(addr)
    }

    #[view]
    public fun owner(): address acquires Capabilities {
        let caps = borrow_global<Capabilities>(@agent_token);
        caps.owner
    }

    // 🔄 Swap (demo only, not for production!)
    // WARNING: This is a placeholder. In production, use a real DEX/router.
    public entry fun swap_lango_to_aptos(sender: &signer, amount: u64) acquires Capabilities {
        let sender_addr = signer::address_of(sender);
        // Burn Lango from sender
        let caps = borrow_global<Capabilities>(@agent_token);
        let coins = coin::withdraw<AgentToken>(sender, amount);
        coin::burn<AgentToken>(coins, &caps.burn_cap);
        // Mint AptosCoin to sender (for demo only, requires mint cap in test env)
        // let aptos_mint_cap = ...; // Not available for AptosCoin in prod
        // let aptos_coins = coin::mint<AptosCoin>(amount, &aptos_mint_cap);
        // coin::deposit<AptosCoin>(sender_addr, aptos_coins);
        // For demo, just a comment
    }

    public entry fun swap_aptos_to_lango(sender: &signer, amount: u64) acquires Capabilities {
        let sender_addr = signer::address_of(sender);
        // Burn AptosCoin from sender (for demo only, requires burn cap in test env)
        // let aptos_burn_cap = ...; // Not available for AptosCoin in prod
        // let coins = coin::withdraw<AptosCoin>(sender, amount);
        // coin::burn<AptosCoin>(coins, &aptos_burn_cap);
        // Mint Lango to sender
        let caps = borrow_global<Capabilities>(@agent_token);
        let lango_coins = coin::mint<AgentToken>(amount, &caps.mint_cap);
        coin::deposit<AgentToken>(sender_addr, lango_coins);
    }

    // 🧪 Test helpers
    #[test_only]
    use aptos_framework::account::create_account_for_test;

    #[test(admin = @agent_token)]
    public fun test_initialize(admin: &signer) acquires Capabilities {
        initialize(admin);
        let admin_addr = signer::address_of(admin);
        assert!(balance(admin_addr) == 10000000000, 1);
        assert!(owner() == admin_addr, 2);
    }

    #[test(admin = @agent_token, user = @0x456)]
    public fun test_mint(admin: &signer, user: &signer) acquires Capabilities {
        initialize(admin);
        let user_addr = signer::address_of(user);
        mint(admin, user_addr, 1000000000);
        assert!(balance(user_addr) == 1000000000, 1);
    }

    #[test(admin = @agent_token, user1 = @0x456, user2 = @0x789)]
    public fun test_transfer(admin: &signer, user1: &signer, user2: &signer) acquires Capabilities {
        initialize(admin);
        let user1_addr = signer::address_of(user1);
        let user2_addr = signer::address_of(user2);
        mint(admin, user1_addr, 1000000000);
        register(user2);
        transfer(user1, user2_addr, 500000000);
        assert!(balance(user1_addr) == 500000000, 1);
        assert!(balance(user2_addr) == 500000000, 2);
    }
}
