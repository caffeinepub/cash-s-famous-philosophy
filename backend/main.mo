import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Quote = {
    text : Text;
  };

  let quotes : [Quote] = [
    { text = "If a fly has no wings, is it just a walk?" },
    { text = "If teachers teach, why don't doctors doct?" },
    { text = "If time flies, where does it land?" },
    { text = "If you wait faster, are you technically arriving sooner?" },
  ];

  public query ({ caller }) func getQuotes() : async [Quote] {
    quotes;
  };
};
