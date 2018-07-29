import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {

        availableUpgrades: [],

        cookies: 0,

        goldenCookies: [
            "LUCKY", "FRENZY"
        ],

        bonusMultiplier : 1,

        currentGoldenCookie: [],

        storeItems: [
            {
                name: "CURSOR",
                logo_pos: {
                    x: 0,
                    y: 0
                },
                price: 15,
                cps: 0.1,
                owned: 0,
                upgrades: [
                    {
                        name: "Reinforced index finger",
                        price: 100,
                        quantity_needed: 1,
                        owned: false,
                        icon_pos: {
                            x: 0,
                            y: 0
                        }
                    },
                    {
                        name: "Carpal tunnel prevention cream",
                        price: 500,
                        quantity_needed: 1,
                        owned: false,
                        icon_pos: {
                            x: 0,
                            y: -48
                        }
                    },
                ]
            },
            {
                name: "Grandma",
                logo_pos: {
                    x: 0,
                    y: -64
                },
                price: 100,
                cps: 1,
                owned: 0,
                upgrades: [
                    {
                        name: "Forwards from grandma",
                        price: 1000,
                        quantity_needed: 1,
                        owned: false,
                        icon_pos: {
                            x: -48,
                            y: 0
                        }
                    },
                    {
                        name: "Steel-plated rolling pins",
                        price: 5000,
                        quantity_needed: 5,
                        owned: false,
                        icon_pos: {
                            x: -48,
                            y: -48
                        }
                    },
                ]
            },
            {
                name: "Farm",
                logo_pos: {
                    x: 0,
                    y: -192
                },
                price: 1100,
                cps: 8,
                owned: 0,
                upgrades: [
                    {
                        name: "Cheap hoes",
                        price: 11000,
                        quantity_needed: 1,
                        owned: false,
                        icon_pos: {
                            x: -96,
                            y: 0
                        }
                    },
                    {
                        name: "Fertilizer",
                        price: 55000,
                        quantity_needed: 5,
                        owned: false,
                        icon_pos: {
                            x: -96,
                            y: -48
                        }
                    },
                ]
            },

        ]
    },
    mutations: {

        INIT_STORE_FROM_LOCAL_STORAGE(state) {
            // if (localStorage.getItem('store')) {
            //     this.replaceState(
            //         Object.assign(state, JSON.parse(localStorage.getItem('store')))
            //     );
            // }
        },

        DO_LUCKY_COOKIE(state) {
            state.cookies += (state.cookies / 100) + 13;
        },

        DO_FRENZY_COOKIE(state) {
            state.bonusMultiplier = 7;

            setTimeout(function () {
                state.bonusMultiplier = 1;
            }, 77000)

        },

        REMOVE_SPAWNED_GOLDEN_COOKIE(state, cookie_type) {
            let index = state.currentGoldenCookie.indexOf(cookie_type)
            state.currentGoldenCookie.splice(index, 1);
        },

        SET_COOKIES_INCREMENT(state) {
            let clickIncrement = 1;
            // GET CURSORS UPGRADES TO IMPLEMENT CLICK LOGIC
            state.storeItems[0].upgrades.map((upgrade) => {
                if (upgrade.owned) {
                    clickIncrement = clickIncrement * 2
                }
            });
            state.cookies += clickIncrement;
        },

        SET_AVAILABLE_UPGRADES(state, availableUpgrades) {
            state.availableUpgrades = availableUpgrades
        },

        SET_COOKIES_INCREMENT_BY_SECONDS(state) {
            state.cookies += this.getters.cookiesPerSecond / 10
        },

        SET_ITEM_OWNED(state, index) {
            if (state.cookies >= state.storeItems[index].price) {
                state.storeItems[index].owned++;
                state.cookies -= state.storeItems[index].price;
                state.storeItems[index].price = Math.floor(state.storeItems[index].price + state.storeItems[index].price * (15 / 100));
            }
        },

        SET_SPAWNED_GOLDEN_COOKIE(state, cookie_type) {
            if (state.currentGoldenCookie.indexOf(cookie_type) < 0) {
                state.currentGoldenCookie.push(cookie_type);
                console.log(cookie_type)
            }
        },

        SET_UPGRADE_OWNED(state, indexes) {
            if (state.cookies >= state.storeItems[indexes.itemIndex].upgrades[indexes.upgradeIndex].price) {
                state.storeItems[indexes.itemIndex].upgrades[indexes.upgradeIndex].owned = true;
                state.cookies -= state.storeItems[indexes.itemIndex].upgrades[indexes.upgradeIndex].price;
            }
        },

    },
    actions: {

        buyItem({commit}, index) {
            commit("SET_ITEM_OWNED", index)
        },

        buyUpgrade({commit}, indexes) {
            commit("SET_UPGRADE_OWNED", indexes)
        },

        computeUpgrades({commit, state}) {
            let availableUpgrades = [];

            state.storeItems.forEach(function (item, itemIndex) {
                item.upgrades.forEach(function (upgrade, upgradeIndex) {
                    if (!upgrade.owned && item.owned >= upgrade.quantity_needed) {
                        upgrade.disabled = state.cookies < upgrade.price;
                        upgrade.indexes = {
                            itemIndex: itemIndex,
                            upgradeIndex: upgradeIndex
                        };
                        availableUpgrades.push(upgrade);
                    }
                })
            });
            commit("SET_AVAILABLE_UPGRADES", availableUpgrades);
        },

        doGoldenCookieAction({commit}, cookie_type) {
            switch (cookie_type) {
                case "LUCKY" :
                    commit("DO_LUCKY_COOKIE");
                    break;

                case "FRENZY" :
                    commit("DO_FRENZY_COOKIE");
                    break
            }
        },

        increment({commit, dispatch}) {
            commit('SET_COOKIES_INCREMENT');
            dispatch('computeUpgrades');

        },

        initStoreFromLocalStroage({commit}) {
            commit("INIT_STORE_FROM_LOCAL_STORAGE")
        },

        launchGoldenInterval({commit, dispatch}) {
            let counter = 0;
            setInterval(function () {
                    counter += 1;
                    if (Math.random() < counter / 900) {
                        counter = 0;
                        dispatch("spawnGoldenCookie")
                    }
                }, 1000
            )
        },

        launchIncrementBySeconds({commit, dispatch}) {
            dispatch('computeUpgrades');
            setInterval(function () {
                commit("SET_COOKIES_INCREMENT_BY_SECONDS");
                dispatch('computeUpgrades');
            }, 100);
        },

        spawnGoldenCookie({commit, state}) {
            commit("SET_SPAWNED_GOLDEN_COOKIE", state.goldenCookies[Math.floor((Math.random() * state.goldenCookies.length))])
        },

        removeGoldenCookie({commit}, cookie_type) {
            commit("REMOVE_SPAWNED_GOLDEN_COOKIE", cookie_type)
        },

    },
    getters: {

        availableUpgrades: state => {
            return state.availableUpgrades;
        },

        cookies: state => {
            return state.cookies
        },

        cookiesPerSecond: state => {
            let cpsTotal = 0;
            state.storeItems.map((item) => {
                cpsTotal += item.cps * item.owned;
                item.upgrades.map((upgrade) => {
                    if (upgrade.owned) {
                        cpsTotal = cpsTotal * 2
                    }
                })
            });
            return cpsTotal * state.bonusMultiplier;
        },

        currentGoldenCookies: state => {
            return state.currentGoldenCookie
        },

        storeItems: state => {
            return state.storeItems
        },


    },
})
