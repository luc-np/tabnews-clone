import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const loadingText = "Carregando...";

  let dataTexts = {
    updatedAt: loadingText,
    version: loadingText,
    maxConnections: loadingText,
    openedConnections: loadingText,
  };

  if (!isLoading && data) {
    dataTexts.updatedAt = data.updated_at;
    dataTexts.version = data.dependencies.database.version;
    dataTexts.maxConnections = data.dependencies.database.max_connections;
    dataTexts.openedConnections = data.dependencies.database.opened_connections;
  }

  return (
    <>
      <div>
        <p>Última atualização: {dataTexts.updatedAt}</p>
        <ul>
          <li>Versão do Postgres: {dataTexts.version}</li>
          <li>Conexões abertas: {dataTexts.openedConnections}</li>
          <li>Máximo de conexões: {dataTexts.maxConnections}</li>
        </ul>
      </div>
    </>
  );
}
