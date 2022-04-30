// getScrollHeight, fetchAPI,

export function getScrollHeight(height: number): boolean {
  if (window.scrollY > height) {
    return true;
  } else return false;
}

export async function fetchAPI<T>(url: string): Promise<{
  error: { server: boolean; internal: boolean; message: string };
  data: T | null;
}> {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return {
        error: { server: false, internal: false, message: "" },
        data,
      };
    } else {
      const msg = await res.json();
      return {
        error: {
          server: true,
          internal: false,
          message: msg || "There was an error happened",
        },
        data: null,
      };
    }
  } catch (err) {
    return {
      error: {
        server: false,
        internal: true,
        message:
          "There was an error happened when loading. Please check your internet connection",
      },
      data: null,
    };
  }
}
