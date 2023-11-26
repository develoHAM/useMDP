import { createSlice } from '@reduxjs/toolkit';
//todo     doing    done

const initialState = [];

const plannerListSlice = createSlice({
    name: 'planners',
    initialState,
    reducers: {
        setPlannersInit(state, action) {
            state = action.payload;
            return state;
        },
        addPlannerList(state,action){
            state = [...state, ...action.payload];
            return state;
        },
        addPlanner(state, action) {
            state = [...state, action.payload];
            return state;
        },
        addCard(state, action) {
            const { id, status, card } = action.payload;
            state[id].cards[status] = [...state[id].cards[status], card];
            return state;
        },
        //id에 있는 planner를 그대로 바꿔치기한다.
        replaceCards(state, action) {
            const { id, cards } = action.payload;

            const newState = state.map((plan) => (plan.plannerId === id ? { ...plan, cards: cards } : plan));
            return newState;
        },
        updateCard(state, action) {
            const { cardId, ...rest } = action.payload;
            return state.map((e) => ({
                ...e,
                cards: e.cards.map((r) =>
                    r.map((d) =>
                        d.cardId === cardId
                            ? {
                                  ...d,
                                  ...Object.keys(rest).reduce((acc, key) => {
                                      if (rest.hasOwnProperty(key)) {
                                          acc[key] = rest[key];
                                      }
                                      return acc;
                                  }, {}),
                              }
                            : d
                    )
                ),
            }));
        },
        updatePlannerTitle(state, action) {
            const { plannerId, title } = action.payload;
            return state.map((e) => (e.plannerId === plannerId ? { ...e, title } : e));
        },
        updatePlanner(state, action) {
            const { id, planner } = action.payload;
            state[id].cards = planner;
            return state;
        },
    },
});
export const plannerListActions = plannerListSlice.actions;
export default plannerListSlice.reducer;
