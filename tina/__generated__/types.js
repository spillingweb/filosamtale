export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const BloggPartsFragmentDoc = gql`
    fragment BloggParts on Blogg {
  __typename
  title
  excerpt
  date
  category
  readingTime
  coverImage
  body
}
    `;
export const ArrangementerPartsFragmentDoc = gql`
    fragment ArrangementerParts on Arrangementer {
  __typename
  title
  description
  image
  date
  endDate
  time
  location
  price
  capacity
  category
  isOnline
  registrationUrl
}
    `;
export const PagesPartsFragmentDoc = gql`
    fragment PagesParts on Pages {
  __typename
  ... on PagesHomepage {
    title
    subtitle
    kicker
    heroImage
    stat1Value
    stat1Label
    stat2Value
    stat2Label
    stat3Value
    stat3Label
    profileImage
    aboutName
    aboutText1
    aboutText2
    quote
    quoteAuthor
    ctaTitle
    ctaDescription
    servicesHeading
    blogHeading
  }
  ... on PagesStandard {
    title
    subtitle
    intro
    profileImage
    body
    contactName
    contactLocation
    contactEmail
    verdier {
      __typename
      tittel
      tekst
    }
  }
  ... on PagesHeader {
    title
    intro
  }
  ... on PagesServices {
    title
    subtitle
    intro
    infoBadge
    faq {
      __typename
      question
      answer
    }
  }
  ... on PagesKontakt {
    title
    kicker
    heading
    description
    addressLine1
    addressLine2
    addressLine3
    email
    phone
  }
}
    `;
export const TjenesterPartsFragmentDoc = gql`
    fragment TjenesterParts on Tjenester {
  __typename
  tittel
  undertittel
  badge
  description
  detaljer
  priser {
    __typename
    label
    pris
  }
  orden
}
    `;
export const UtdanningPartsFragmentDoc = gql`
    fragment UtdanningParts on Utdanning {
  __typename
  ar
  grad
  sted
}
    `;
export const BloggDocument = gql`
    query blogg($relativePath: String!) {
  blogg(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BloggParts
  }
}
    ${BloggPartsFragmentDoc}`;
export const BloggConnectionDocument = gql`
    query bloggConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BloggFilter) {
  bloggConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BloggParts
      }
    }
  }
}
    ${BloggPartsFragmentDoc}`;
export const ArrangementerDocument = gql`
    query arrangementer($relativePath: String!) {
  arrangementer(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ArrangementerParts
  }
}
    ${ArrangementerPartsFragmentDoc}`;
export const ArrangementerConnectionDocument = gql`
    query arrangementerConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ArrangementerFilter) {
  arrangementerConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ArrangementerParts
      }
    }
  }
}
    ${ArrangementerPartsFragmentDoc}`;
export const PagesDocument = gql`
    query pages($relativePath: String!) {
  pages(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PagesParts
  }
}
    ${PagesPartsFragmentDoc}`;
export const PagesConnectionDocument = gql`
    query pagesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PagesFilter) {
  pagesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PagesParts
      }
    }
  }
}
    ${PagesPartsFragmentDoc}`;
export const TjenesterDocument = gql`
    query tjenester($relativePath: String!) {
  tjenester(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TjenesterParts
  }
}
    ${TjenesterPartsFragmentDoc}`;
export const TjenesterConnectionDocument = gql`
    query tjenesterConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TjenesterFilter) {
  tjenesterConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TjenesterParts
      }
    }
  }
}
    ${TjenesterPartsFragmentDoc}`;
export const UtdanningDocument = gql`
    query utdanning($relativePath: String!) {
  utdanning(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...UtdanningParts
  }
}
    ${UtdanningPartsFragmentDoc}`;
export const UtdanningConnectionDocument = gql`
    query utdanningConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: UtdanningFilter) {
  utdanningConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...UtdanningParts
      }
    }
  }
}
    ${UtdanningPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    blogg(variables, options) {
      return requester(BloggDocument, variables, options);
    },
    bloggConnection(variables, options) {
      return requester(BloggConnectionDocument, variables, options);
    },
    arrangementer(variables, options) {
      return requester(ArrangementerDocument, variables, options);
    },
    arrangementerConnection(variables, options) {
      return requester(ArrangementerConnectionDocument, variables, options);
    },
    pages(variables, options) {
      return requester(PagesDocument, variables, options);
    },
    pagesConnection(variables, options) {
      return requester(PagesConnectionDocument, variables, options);
    },
    tjenester(variables, options) {
      return requester(TjenesterDocument, variables, options);
    },
    tjenesterConnection(variables, options) {
      return requester(TjenesterConnectionDocument, variables, options);
    },
    utdanning(variables, options) {
      return requester(UtdanningDocument, variables, options);
    },
    utdanningConnection(variables, options) {
      return requester(UtdanningConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
