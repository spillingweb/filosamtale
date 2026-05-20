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
  date
  endDate
  time
  location
  price
  capacity
  category
  isOnline
  registrationUrl
  body
}
    `;
export const SiderPartsFragmentDoc = gql`
    fragment SiderParts on Sider {
  __typename
  title
  body
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
export const SiderDocument = gql`
    query sider($relativePath: String!) {
  sider(relativePath: $relativePath) {
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
    ...SiderParts
  }
}
    ${SiderPartsFragmentDoc}`;
export const SiderConnectionDocument = gql`
    query siderConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiderFilter) {
  siderConnection(
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
        ...SiderParts
      }
    }
  }
}
    ${SiderPartsFragmentDoc}`;
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
    sider(variables, options) {
      return requester(SiderDocument, variables, options);
    },
    siderConnection(variables, options) {
      return requester(SiderConnectionDocument, variables, options);
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
