type Relation = { [key: string]: string };
type Relations = Relation[];
export type Result = { [key: string]: string[] };

export const fromManyToMany = (
  relations: Relations,
  key: string,
  value: string,
): Result => {
  const res: Result = {};
  relations.forEach((relation) => {
    if (!res[relation[key]]) {
      res[relation[key]] = [];
    }
    res[relation[key]].push(relation[value]);
  });
  return res;
};
