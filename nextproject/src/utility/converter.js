import Papa from "papaparse";

export const fetchCsv = async (file) => {
  const res = await fetch(file);
  const reader = res.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value);
  return csv;
};

export const converter = async (path) => {
  const csv = await fetchCsv(path);
  const result = Papa.parse(csv, {
    header: true,
  });
  const rows = result.data;
  return rows;
};
