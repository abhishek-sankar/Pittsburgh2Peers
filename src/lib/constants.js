export const stages = {
  HOMEPAGE: "homepage",
  FIND_A_RIDE: "find_a_ride",
  REQUEST_A_UHAUL: "request_a_uhaul",
  ARRIVAL_DETAILS: "arrival_details",
  ARRIVAL_DETAILS_TIME: "arrival_details_time",
  NUMBER_OF_PASSENGERS: "number_of_passengers",
  NUMBER_OF_BAGS: "number_of_bags",
  REQUEST_DETAILS: "request_details",
  SOURCE_DESTINATION: "source_destination",
  CONTACT_INFO: "contact_info",
  CONFIRMATION: "confirmation",
};

export const navigation = {
  [stages.HOMEPAGE]: {
    next: stages.FIND_A_RIDE,
    prev: stages.HOMEPAGE,
  },
  [stages.FIND_A_RIDE]: {
    next: stages.ARRIVAL_DETAILS,
    prev: stages.HOMEPAGE,
  },
  [stages.REQUEST_A_UHAUL]: {
    next: stages.ARRIVAL_DETAILS,
    prev: stages.HOMEPAGE,
  },
  [stages.ARRIVAL_DETAILS]: {
    next: stages.REQUEST_DETAILS,
    prev: stages.HOMEPAGE,
  },
  //   [stages.ARRIVAL_DETAILS_TIME]: {
  //     next: stages.REQUEST_DETAILS,
  //     prev: stages.ARRIVAL_DETAILS,
  //   },
  //   [stages.LOOKING_FOR]: {
  //     next: stages.REQUEST_DETAILS,
  //     prev: stages.ARRIVAL_DETAILS,
  //   },
  [stages.REQUEST_DETAILS]: {
    next: stages.SOURCE_DESTINATION,
    prev: stages.ARRIVAL_DETAILS,
  },
  [stages.SOURCE_DESTINATION]: {
    next: stages.CONTACT_INFO,
    prev: stages.REQUEST_DETAILS,
  },
  [stages.CONTACT_INFO]: {
    next: stages.CONFIRMATION,
    prev: stages.SOURCE_DESTINATION,
  },
  [stages.CONFIRMATION]: {
    next: null,
    prev: stages.CONTACT_INFO,
  },
};

export const LookingFor = {
  PASSENGERS: "passengers",
  RIDE: "ride",
};

export const P2PServices = {
  FIND_A_RIDE: "find_a_ride",
  REQUEST_A_UHAUL: "request_uhaul",
};
