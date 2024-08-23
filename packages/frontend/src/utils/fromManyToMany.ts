type Relation = { [key: string]: string };
type Relations = Set<Relation>;
export type Result = { [key: string]: Set<string> };

export const fromManyToMany = (
  relations: Relations,
  key: string,
  value: string,
): Result => {
  const res: Result = {};
  relations.forEach((relation) => {
    if (!res[relation[key]]) {
      res[relation[key]] = new Set();
    }
    res[relation[key]].add(relation[value]);
  });
  return res;
};
