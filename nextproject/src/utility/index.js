/* eslint-disable no-self-assign */
//Getting the tools, skills from the data
export const handleGetDataset = (list, key, role) => {
  const obj = {};
  const data = list.filter((item) => item.job_title === role);
  const response = data.map((item) => item[key]).filter((res) => res !== "[]");
  const word = response.map((item) =>
    item.substring(1, item.length - 1).split(",")
  );
  const simple = word.reduce((a, b) => a.concat(b), []);
  for (let i = 0; i < simple.length; i++) {
    let item = simple[i]
      .trim()
      .substring(1, simple[i].length - 1)
      .trim();
    if (item.includes("'")) {
      item = item.substring(0, item.length - 1);
    }
    if (obj[item]) {
      obj[item] += 1;
    } else {
      obj[item] = 1;
    }
  }
  return obj;
};

//Getting the education, worktype and years of experience from the data
export const handleGetData = (list, key, role) => {
  const obj = {};
  const unit = list.filter((item) => item.job_title === role);
  const data = unit.filter(
    (item) => item[key] !== "Not Specified" && item[key] !== undefined
  );
  const edu = data.map((item) => item[key]);
  for (let i = 0; i < edu.length; i++) {
    let item = edu[i];
    if (obj[item]) {
      obj[item] += 1;
    } else {
      obj[item] = 1;
    }
  }
  return obj;
};

//Getting the sector from the data
export const handleGetSector = (list, role) => {
  const obj = {};
  role === "Data Analyst" ? (role = "Data analyst") : (role = role);
  const data = list.filter((item) => item.Job_Title === role);
  const sector = data
    .map((item) => item.Industry)
    .filter((res) => res !== "[]");
  const word = sector.map((item) =>
    item.substring(1, item.length - 1).split(",")
  );
  const simple = word.reduce((a, b) => a.concat(b), []);
  for (let i = 0; i < simple.length; i++) {
    let item = simple[i]
      .trim()
      .substring(1, simple[i].length - 1)
      .trim();
    if (item.includes("'")) {
      item = item.substring(0, item.length - 1);
    }
    if (obj[item]) {
      obj[item] += 1;
    } else {
      obj[item] = 1;
    }
  }
  return obj;
};
