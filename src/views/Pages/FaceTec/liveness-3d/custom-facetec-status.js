import { FaceTecSDK } from "../../../../../core/core-sdk/FaceTecSDK.js/FaceTecSDK";

export var CustomFaceTecStatus = (function () {
  const status = [
    {
      id: FaceTecSDK.FaceTecSDKStatus.NeverInitialized,
      message: "Inicialização não realizada.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.Initialized,
      message: "Inicializado com sucesso.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.NetworkIssues,
      message: "A inicialização falhou devido a problemas de rede.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.InvalidDeviceKeyIdentifier,
      message:
        "O identificador de chave do dispositivo fornecido era inválido.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.VersionDeprecated,
      message: "A versão atual do SDK está obsoleta.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.DeviceNotSupported,
      message: "O dispositivo é incompatível com o SDK.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.DeviceInLandscapeMode,
      message: "O dispositivo está no modo paisagem.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.DeviceLockedOut,
      message: "O dispositivo está bloqueado devido a muitas falhas.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.KeyExpiredOrInvalid,
      message:
        "A chave expirou, continha texto inválido ou você está tentando inicializar em um aplicativo que não está especificado em sua chave.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.IFrameNotAllowedWithoutPermission,
      message:
        "A sessão foi cancelada, o FaceTec Browser SDK foi aberto em um iFrame sem permissão.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.StillLoadingResources,
      message: "FaceTec SDK ainda está carregando recursos.",
    },
    {
      id: FaceTecSDK.FaceTecSDKStatus.ResourcesCouldNotBeLoadedOnLastInit,
      message: "FaceTec SDK não pôde carregar recursos.",
    },
  ];

  return {
    status,
  };
})();
