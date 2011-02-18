/*
Criado por Ricardo Pontes (@ricardopontes)
Email: chuck.info@gmail.com
*/

CmdUtils.CreateCommand({
  names: ["vamu", "va.mu"],
  arguments: noun_type_url,
  icon: 'http://va.mu/favicon.ico',
  description: ("Encurte sua URL com o va.mu :-)."),
  preview: function(pblock, {object: {text}}){
    if (!text) {
      pblock.innerHTML = this.description;
      return;
    }
    var shortener = this;
    pblock.innerHTML = _("Encurtando URL...");
    CmdUtils.previewGet(pblock, this._api(text), function(vamu) {
      if(vamu !== "Error")
        pblock.innerHTML = _("Url encurtada <b>${vamu}</b>.",
                             {vamu:shortener._link(vamu)});
    });
  },
  execute: function(args) {
    var shortener = this;
    jQuery.get(this._api(args.object.text), function(vamu) {
      CmdUtils.setSelection(shortener._link(vamu), {text: vamu});
      Utils.clipboard.text = vamu;
    });
  },
  _api: function(url)("http://va.mu/api/create/?url=" + 
			                   encodeURIComponent(url)),
  _link: function(url) {
    var conteudo = Utils.escapeHtml(url);
    return conteudo.link(conteudo);
  },
});
