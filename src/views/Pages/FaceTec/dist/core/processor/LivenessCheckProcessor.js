import { FaceTecSDK } from "../core-sdk/FaceTecSDK.js/FaceTecSDK";
import { Crypto } from "../../src/crypto/crypto";
export const LivenessCheckProcessor = function (e, t) {
  var s = this;
  (this.latestNetworkRequest = new XMLHttpRequest()),
    (this.processSessionResultWhileFaceTecSDKWaits = function (e, t) {
      if (
        ((s.latestSessionResult = e),
        e.status !==
          FaceTecSDK.FaceTecSessionStatus.SessionCompletedSuccessfully)
      )
        return (
          console.log(
            "A sessão não foi completada com sucesso. Cancelando. Status da Sessão: " +
              FaceTecSDK.FaceTecSessionStatus[e.status]
          ),
          s.latestNetworkRequest.abort(),
          void t.cancel()
        );
      this.appkey = s.sampleAppControllerReference.getAppKey();
      var a = {
        appkey: this.appkey,
        userAgent: FaceTecSDK.createFaceTecAPIUserAgentString(e.sessionId),
        faceScan: e.faceScan,
        auditTrailImage: e.auditTrail[0],
        lowQualityAuditTrailImage: e.lowQualityAuditTrail[0],
        sessionId: e.sessionId,
      };
      (s.latestNetworkRequest = new XMLHttpRequest()),
        s.latestNetworkRequest.open(
          "POST",
          "https://comercial.certiface.com.br/facecaptcha/service/captcha/3d/liveness"
        ),
        s.latestNetworkRequest.setRequestHeader(
          "Content-Type",
          "application/json"
        ),
        (s.latestNetworkRequest.onreadystatechange = function () {
          if (s.latestNetworkRequest.readyState === XMLHttpRequest.DONE)
            try {
              var e = JSON.parse(s.latestNetworkRequest.responseText),
                a = e.scanResultBlob;
              e.codID
                ? (FaceTecSDK.FaceTecCustomization.setOverrideResultScreenSuccessMessage(
                    "Liveness\nConfirmado"
                  ),
                  t.proceedToNextStep(a))
                : (console.log("Resposta inesperada da API. Cancelando."),
                  t.cancel());
            } catch (e) {
              console.log(
                "Ocorreu uma exceção ao manipular a resposta da API. Cancelando."
              ),
                t.cancel();
            }
        }),
        (s.latestNetworkRequest.onerror = function () {
          console.log("Erro de requisição de HTTP. Cancelando."), t.cancel();
        }),
        (s.latestNetworkRequest.upload.onprogress = function (e) {
          var s = e.loaded / e.total;
          t.uploadProgress(s);
        }),
        (a.auditTrailImage = Crypto.encryptImages(
          a.auditTrailImage,
          this.appkey
        )),
        (a.lowQualityAuditTrailImage = Crypto.encryptImages(
          a.lowQualityAuditTrailImage,
          this.appkey
        ));
      var o = JSON.stringify(a);
      s.latestNetworkRequest.send(o),
        window.setTimeout(function () {
          s.latestNetworkRequest.readyState !== XMLHttpRequest.DONE &&
            t.uploadMessageOverride("Ainda enviando...");
        }, 6e3);
    }),
    (this.onFaceTecSDKCompletelyDone = function () {
      (s.success = s.latestSessionResult.isCompletelyDone),
        s.sampleAppControllerReference.onComplete(
          s.latestSessionResult,
          null,
          s.latestNetworkRequest.status
        );
    }),
    (this.isSuccess = function () {
      return s.success;
    }),
    (this.success = !1),
    (this.sampleAppControllerReference = t),
    (this.latestSessionResult = null),
    new FaceTecSDK.FaceTecSession(this, e);
};
