import { useEffect } from "react";

export function useKeyPress(key, Callback) {
  useEffect(
    function () {
      function callback(e) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          Callback();
        }
      }

      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [Callback,key]
  );
}



