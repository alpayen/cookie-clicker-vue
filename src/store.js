import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cookies: 10000,
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
        ],
        availableUpgrades: []
    },
    mutations: {
        SET_COOKIES_INCREMENT(state) {
            let clickIncrement = 1;
            // GET CURSORS UPRGRADES TO IMPLEMENT CLICK LOGIC
            state.storeItems[0].upgrades.map((upgrade) => {
                if (upgrade.owned) {
                    clickIncrement = clickIncrement * 2
                }
            });
            state.cookies += clickIncrement;
        },
        initialiseStore(state) {
            // if (localStorage.getItem('store')) {
            //     this.replaceState(
            //         Object.assign(state, JSON.parse(localStorage.getItem('store')))
            //     );
            // }
        },
        SET_ITEM_OWNED(state, index) {
            if (state.cookies >= state.storeItems[index].price) {
                state.storeItems[index].owned++;
                state.cookies -= state.storeItems[index].price;
                state.storeItems[index].price = Math.floor(state.storeItems[index].price + state.storeItems[index].price * (15 / 100));
            }
        },
        SET_UPGRADE_OWNED(state, indexes) {
            if (state.cookies >= state.storeItems[indexes.itemIndex].upgrades[indexes.upgradeIndex].price) {
                state.storeItems[indexes.itemIndex].upgrades[indexes.upgradeIndex].owned = true;
                state.cookies -= state.storeItems[indexes.itemIndex].upgrades[indexes.upgradeIndex].price;
            }
        },
        incrementBySeconds(state) {
            state.cookies += this.getters.cookiesPerSecond / 10
        },
        SET_AVAILABLE_UPGRADES(state, availableUpgrades) {
            Vue.set(state, 'availableUpgrades', availableUpgrades);
            state.availableUpgrades = availableUpgrades
        }
    },
    actions: {
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
        increment({commit, dispatch}) {
            commit('SET_COOKIES_INCREMENT');
            dispatch('computeUpgrades');

        },
        buyItem({commit}, index) {
            commit("SET_ITEM_OWNED", index)
        },
        buyUpgrade({commit}, indexes) {
            commit("SET_UPGRADE_OWNED", indexes)
        },
        launchIncrementBySeconds({commit, dispatch}) {
            dispatch('computeUpgrades');
            setInterval(function () {
                commit("incrementBySeconds");
                dispatch('computeUpgrades');

            }, 100);
        }
    },
    getters: {
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
            return cpsTotal;
        },
        storeItems: state => {
            return state.storeItems
        },
        availableUpgrades: state => {
            return state.availableUpgrades;
        }
    },
})
