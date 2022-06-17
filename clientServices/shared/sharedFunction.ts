// getScrollHeight, fetchAPI,

import { StatesReturnType } from "../../contex/contex-type";

export function getScrollHeight(height: number): boolean {
  if (window.scrollY > height) {
    return true;
  } else return false;
}

export async function fetchAPI<T>(
  url: string,
  options?: RequestInit
): Promise<{
  error: string | null;
  authentication: boolean;
  netProblem: boolean;
  data: T | null;
}> {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      const data = await res.json();
      return {
        error: null,
        authentication: true,
        netProblem: false,
        data,
      };
    } else if (res.status === 401) {
      return {
        error: "user authentication failed",
        authentication: false,
        netProblem: false,
        data: null,
      };
    } else {
      const msg = await res.json();
      return {
        error: msg.message || "There was an serverside error",
        authentication: true,
        netProblem: false,
        data: null,
      };
    }
  } catch (err) {
    return {
      error: null,
      authentication: false,
      netProblem: true,
      data: null,
    };
  }
}

export function handleError(
  data: { error: string | null; authentication: boolean; netProblem: boolean },
  state: StatesReturnType
) {
  if (data.netProblem) {
    state.setError(data.netProblem);
  } else {
    state.setAlert(data.error);
  }
}
