import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Erro ao carregar dados.</div>;
  }

  const { update_at, dependencies } = data;
  const { database } = dependencies;

  return (
    <>
      <h1>Details of Database</h1>
      <div>Last Update at: {new Date(update_at).toLocaleString()}</div>
      <div>Database Version: {database.version}</div>
      <div>Max Connection: {database.max_connections}</div>
      <div>Opened Connection: {database.opened_connections}</div>
    </>
  );
}
