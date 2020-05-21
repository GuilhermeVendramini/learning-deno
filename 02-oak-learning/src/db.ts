type account = Array<{ login: string; password: string }>;

const db: { accounts: account } = {
  accounts: [],
};

export default db;
