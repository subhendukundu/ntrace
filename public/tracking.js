(async (_) => {
    if (typeof window !== "undefined") {
        const {
            location: { hostname, pathname },
            sessionStorage,
        } = window;
        const script = document.querySelector("script[data-project-id]");
        try {
            const attr = (key) => script && script.getAttribute(key);
            const projectId = attr("data-project-id");
            const referrer = document.referrer;
            const key = `ntrace.io:analytics:${hostname}`;
            const sessionId = sessionStorage.getItem(key);
            const response = await fetch(
                "https://ntrace.io/api/v1/tracker",
                {
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        referrer,
                        pathname,
                        sessionId,
                        projectId,
                    }),
                }
            );
            const responseData = await response.json();
            if (!sessionId) {
                sessionStorage.setItem(key, responseData.sessionId);
            }

            // eslint-disable-next-line no-inner-declarations
            async function onVisibilityAndStateChange() {
                const currentSessionId = sessionStorage.getItem(key);
                const {
                    location: { pathname: currentPath },
                } = window;
                if (document.visibilityState === "hidden") {
                    if (navigator.sendBeacon) {
                        navigator.sendBeacon(
                            "https://ntrace.io/api/v1/tracker",
                            JSON.stringify({
                                referrer,
                                pathname: currentPath,
                                sessionId: currentSessionId,
                            })
                        );
                    } else {
                        fetch("https://ntrace.io/api/v1/tracker", {
                            method: "post",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                referrer,
                                pathname: currentPath,
                                sessionId: currentSessionId,
                            }),
                        });
                    }
                }
            }

            history.pushState = ((f) =>
                function pushState() {
                    const ret = f.apply(this, arguments);
                    onVisibilityAndStateChange();
                    return ret;
                })(history.pushState);

            history.replaceState = ((f) =>
                function replaceState() {
                    const ret = f.apply(this, arguments);
                    onVisibilityAndStateChange();
                    return ret;
                })(history.replaceState);

            window.addEventListener("popstate", () => {
                onVisibilityAndStateChange();
            });
            document.addEventListener(
                "visibilitychange",
                onVisibilityAndStateChange
            );
        } catch (e) {
            console.error("There was an error!");
        }
    }
})();
