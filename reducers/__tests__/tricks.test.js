import tricksReducer, { toggleTrick } from "../tricks";

describe("tricks reducer", () => {
  it("devrait ajouter un trick quand il n'est pas encore validé", () => {
    const initialState = { value: [] };
    const action = toggleTrick("kickflip");

    const newState = tricksReducer(initialState, action);

    expect(newState.value).toContain("kickflip");
  });

  it("devrait retirer un trick s'il était déjà validé", () => {
    const initialState = { value: ["kickflip"] };
    const action = toggleTrick("kickflip");

    const newState = tricksReducer(initialState, action);

    expect(newState.value).not.toContain("kickflip");
  });
});


// test pour voir si un trick est validé ou pas