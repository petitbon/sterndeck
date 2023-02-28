let globalMoesif = null;

// so you can keep your action names consistent by having one central place for all the action names.
export const ACTION_TYPES = {
  sign_in: 'sign_in',
  clicked_price: 'clicked_price',
};

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  import('moesif-browser-js').then((moesif) => {
    moesif.init({
      applicationId: 'sterndeck-4',
    });
    // this below assigns moesif object to the modually global moesif object.
    globalMoesif = moesif;
    // optional this below assign moesif object to the global window object.
    window.moesif = moesif;
  });
}

export function track(action, metadata) {
  if (globalMoesif) {
    globalMoesif.track(action, metadata);
  }
}

export function identifyUser(userId, profileData) {
  if (globalMoesif) {
    globalMoesif.identifyUser(userId, profileData);
  }
}
