export default class Point {
  constructor(type, destinationId, startTime, endTime, basePrice, selectedOffers = [], isFavorite = false, id = null) {
    this.id = id || this.generateId();
    this.type = type;
    this.destinationId = destinationId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.basePrice = basePrice;
    this.selectedOffers = selectedOffers;
    this.isFavorite = isFavorite;
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getTotalPrice(offersMap) {
    const offersPrices = this.selectedOffers.reduce((sum, offerId) => {
      const offer = offersMap[offerId];
      return sum + (offer ? offer.price : 0);
    }, 0);
    return this.basePrice + offersPrices;
  }

  getDuration() {
    const diff = this.endTime - this.startTime;
    const totalMinutes = Math.floor(diff / 1000 / 60);

    if (totalMinutes < 60) {
      return `${totalMinutes}M`;
    }

    const days = Math.floor(totalMinutes / 60 / 24);
    const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
    const minutes = totalMinutes - days * 24 * 60 - hours * 60;

    if (days === 0) {
      if (minutes === 0) {
        return `${String(hours).padStart(2, '0')}H 00M`;
      }
      return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
    }

    return `${days}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
}
