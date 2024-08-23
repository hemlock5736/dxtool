export type Member = {
  email: string;
  id: string;
  name: string;
  nameKana: string;
  department: string;
  position: string;
};

export type Members = {
  [key: string]: Member;
};
