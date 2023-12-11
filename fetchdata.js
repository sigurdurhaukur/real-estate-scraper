async function fetchData(limit = 16) {
  const graphqlQuery = {
    operationName: "GetRealestates",
    variables: {
      size_search_id: {},
      price_search_id: {},
      address_search_id: {},
      zip_search_id: {},
      constrDate: {},
      created: { _lt: "2023-12-09T17:12:26.341032+00:00" },
      text: {},
      limit: 100000,
      order: [{ sent_dags: "desc_nulls_last" }],
      authenticated: false,
      //   address: ,
    },
    query: `
      query GetRealestates(
        $authenticated: Boolean!,
        $limit: Int!,
        $postalCodes: [smallint!],
        $text: fs_ts_search_args!,
        $rooms: smallint_comparison_exp = {},
        $size: float8_comparison_exp = {},
        $size_search_id: String_comparison_exp = {},
        $price: bigint_comparison_exp = {},
        $price_search_id: String_comparison_exp = {},
        $address_search_id: String_comparison_exp = {},
        $zip_search_id: String_comparison_exp = {},
        $mortgage: Int_comparison_exp = {},
        $constrDate: smallint_comparison_exp = {},
        $address: String,
        $type: [String!],
        $checkboxes: fs_fasteign_bool_exp = {},
        $tabs: fs_fasteign_bool_exp = {},
        $order: [fs_fasteign_order_by!],
        $created: timestamptz_comparison_exp = {}
      ) {
        fs_ts_search(args: $text, where: {
          _and: [
            { postfang: { _in: $postalCodes } },
            { fjoldi_herb: $rooms },
            { fermetrar: $size },
            { size_search_id: $size_search_id },
            { verd: $price },
            { price_search_id: $price_search_id },
            { address_search_id: $address_search_id },
            { zip_search_id: $zip_search_id },
            { ahvilandi_lan: $mortgage },
            { teg_eign: { _in: $type } },
            { sent_dags: $created },
            { bygg_ar: $constrDate },
            { heimilisfang: { _ilike: $address } },
            $checkboxes,
            $tabs
          ]
        }, order_by: $order, limit: $limit) {
          id: eign_id
          price: verd
          address: heimilisfang
          zipcode: postfang
          rooms: fjoldi_herb
          bedRooms: fjoldi_svefnhb
          type: teg_eign
          created: sent_dags
          size: fermetrar
          size_search_id
          price_search_id
          address_search_id
          zip_search_id
          images(order_by: { imgno: asc }) {
            id
            e_low
            small
            imgno
            __typename
          }
          postal_code {
            postnr
            city: baer
            __typename
          }
          openHouse: latest_openhouse {
            dt_search_id
            date
            open
            close
            __typename
          }
          favorite @include(if: $authenticated) {
            id
            realestate_id
            created
            __typename
          }
          __typename
        }
      }
    `,
  };

  const response = await fetch("https://g.mbl.is/v1/graphql", {
    body: JSON.stringify(graphqlQuery),
    method: "POST",
  }).catch((error) => console.log(error));

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchData;
