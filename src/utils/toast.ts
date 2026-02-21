import { toastController } from "@ionic/vue";


export const showToast = async (
  uzenet: string,
  szin: "success" | "danger" | "warning" | "dark" = "dark",
) => {
  const toast = await toastController.create({
    message: uzenet,
    duration: 2000,
    color: szin,
    position: "bottom",
    buttons: [
      {
        text: "OK",
        role: "cancel",
      },
    ],
  });

  await toast.present();
};
