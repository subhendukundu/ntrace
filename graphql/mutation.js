import { gql } from "@apollo/client";

export const INSERT_PROJECT = gql`
    mutation insertProject($item: [project_insert_input!]!) {
        insert_project(objects: $item) {
            affected_rows
        }
    }
`;
export const DELETE_PROJECT_BY_ID = gql`
    mutation deleteData($projectId: uuid!) {
        delete_project_by_pk(project_id: $projectId) {
            project_id
        }
    }
`;

export const UPDATE_PROJECT_BY_ID = gql`
    mutation updateProject($projectId: uuid!, $data: project_set_input) {
        update_project_by_pk(
            pk_columns: { project_id: $projectId }
            _set: $data
        ) {
            project_id
        }
    }
`;

export const CREATE_CHECKOUT = gql`
    mutation checkout($object: CheckoutInfoInput!) {
        checkoutInfo: checkout_project(object: $object) {
            sessionId
        }
    }
`;
