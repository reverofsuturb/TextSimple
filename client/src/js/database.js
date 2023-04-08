import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// exporting put function to use 
export const putDb = async (content) => {
  console.log("PUT to the database")
// connection to the database and version
  const jateDb = await openDB("jate", 1);
// new readwrite transaction with db
  const tx = jateDb.transaction("jate", "readwrite");
// open 'jate' object store
  const store = tx.objectStore("jate");
// use .put method to update the content
  const request = store.put({ value: content });
// request confirmation
  const result = await request;
  console.log(result);
};

export const getDb = async () => {
console.log("GET from the database")
// connection to the database and version
  const jateDb = await openDB("jate", 1);
// new readonly transaction with db
  const tx = jateDb.transaction("jate", "readonly");
// open 'jate' object store
  const store = tx.objectStore("jate");
// using getall to get all data in the database
  const request = store.getAll();
// request confirmation
  const result = await request;
  console.log("result.value", result);
  return result.value;
};

initdb();
