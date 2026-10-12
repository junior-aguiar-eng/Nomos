const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export { API_URL };

export async function fetchDisciplinas() {
  const res = await fetch(`${API_URL}/api/disciplinas`);
  if (!res.ok) throw new Error(`Falha ao buscar disciplinas: ${res.statusText}`);
  return res.json();
}

export async function fetchTemas(
  slug: string = 'direito-administrativo',
  searchQuery: string = ''
) {
  const url = searchQuery.trim()
    ? `${API_URL}/api/disciplinas/${slug}/temas?q=${encodeURIComponent(searchQuery.trim())}`
    : `${API_URL}/api/disciplinas/${slug}/temas`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Falha ao buscar temas: ${res.statusText}`);
  return res.json();
}

export async function fetchTemaCompleto(temaId: string) {
  const res = await fetch(`${API_URL}/api/temas/${temaId}`);
  if (!res.ok) throw new Error(`Falha ao carregar tema '${temaId}': ${res.statusText}`);
  return res.json();
}

export async function fetchCasos() {
  const res = await fetch(`${API_URL}/api/casos`);
  if (!res.ok) throw new Error(`Falha ao carregar casos práticos: ${res.statusText}`);
  return res.json();
}

export async function fetchCasoCompleto(casoId: string) {
  const res = await fetch(`${API_URL}/api/casos/${casoId}`);
  if (!res.ok) throw new Error(`Falha ao carregar caso '${casoId}': ${res.statusText}`);
  return res.json();
}
