export const getStatusColor = (statusz: string): string => {
  if (!statusz) return "medium";

  switch (statusz.toLowerCase()) {
    case "új":
    case "uj":
      return "primary";
    case "folyamatban":
      return "warning";
    case "kész":
    case "kesz":
      return "success";
    case "törölve":
    case "torolve":
      return "danger";
    default:
      return "medium";
  }
};

export const getStatusText = (statusz: string): string => {
  if (!statusz) return 'Új'; // Ha üres, alapértelmezetten "Új"
  
  switch (statusz.toLowerCase()) {
    case 'új':
    case 'uj':
      return 'Új';
    case 'folyamatban':
      return 'Folyamatban';
    case 'kész':
    case 'kesz':
      return 'Kész';
    case 'törölve':
    case 'torolve':
      return 'Törölve';
    default:
      return statusz; // Ha valami ismeretlen, kiírja úgy, ahogy van
  }
};
