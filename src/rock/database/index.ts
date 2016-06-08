import { merge } from "lodash";

import { Tables } from "../mssql";

import people from "./../models/people/tables";
import finances from "./../models/people/tables";


let tables = {
  people,
  finances,
} as {
  [key: string]: {
    connect: () => Tables;
    bind?: (Tables) => void;
  }
};

export function createTables() {
   let createdTables = {};

  for (let table in tables) {
    try {
      createdTables = merge(createdTables, tables[table].connect());
    } catch (e) {
      console.error(e);
    }

  }

  for (let table in tables) {
    try {
      if (tables[table].bind) tables[table].bind(createdTables);
    } catch (e) {
      console.error(e);
    }

  }

  return createdTables as Tables;
}
