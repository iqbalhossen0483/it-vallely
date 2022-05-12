// getScrollHeight, fetchAPI,

export function getScrollHeight(height: number): boolean {
  if (window.scrollY > height) {
    return true;
  } else return false;
}

export async function fetchAPI<T>(url: string): Promise<{
  error: string | null;
  netProblem: boolean;
  data: T | null;
}> {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return {
        error: null,
        netProblem: false,
        data,
      };
    } else {
      const msg = await res.json();
      return {
        error: msg || "There was an serverside error",
        netProblem: false,
        data: null,
      };
    }
  } catch (err) {
    return {
      error: null,
      netProblem: true,
      data: null,
    };
  }
}
