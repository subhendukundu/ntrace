import { atom } from "jotai";

export const selectedCountry = atom({
    id: "",
    name: "",
    count: 0,
});

export const currentlyViewing = atom({
    count: 0,
    activeStatistic: "users",
});

export const currentDataWithCounts = atom({
    users: [],
    sessions: [],
    active: [],
    bounce: [],
});

export const showingDateFor = atom(7);
