const router = new Proxy(window.location, {
  get: (target, key, receiver) => {
    return Reflect.get(target, key, receiver);
  },
  set(target, p, newValue, receiver) {
    if (p === "pathname") {
      history.pushState({}, "", newValue);
      // Trigger custom route logic
      console.log("Pathname changed to:", newValue);
      return true;
    }
    return Reflect.set(target, p, newValue, receiver);
  },
});

export default router;
