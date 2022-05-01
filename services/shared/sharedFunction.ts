// getScrollHeight, fetchAPI,

export function getScrollHeight(height: number): boolean {
  if (window.scrollY > height) {
    return true;
  } else return false;
}

export async function fetchAPI<T>(url: string): Promise<{
  error: boolean;
  netProblem: boolean;
  message: string | null;
  data: T | null;
}> {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return {
        error: false,
        netProblem: false,
        message: null,
        data,
      };
    } else {
      const msg = await res.json();
      return {
        error: true,
        netProblem: false,
        message: msg || "There was an serverside error",
        data: null,
      };
    }
  } catch (err) {
    return {
      error: false,
      netProblem: true,
      message: "connection problem",
      data: null,
    };
  }
}
