import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  let quotes = [
    "If an orange is called an orange, why is an apple not called a red?",
    "Your tongue knows what everything tastes like.",
  ];

  public query ({ caller }) func getQuotes() : async [Text] {
    quotes;
  };
};
