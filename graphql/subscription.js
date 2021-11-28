import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
    subscription getProjects($order: order_by) {
        project(order_by: { domain: $order }) {
            domain
            projectId: project_id
            createdAt: created_at
            timezone
            shareId: share_id
        }
    }
`;
export const GET_PROJECTS_DETAILS = gql`
    subscription sessionsAggregate(
        $projectId: uuid!
        $where: session_bool_exp
    ) {
        project: project_by_pk(project_id: $projectId) {
            domain
            timezone
            active: sessions_aggregate(where: $where, distinct_on: ip) {
                aggregate {
                    count
                }
            }
            totalViews: sessions_aggregate {
                aggregate {
                    count
                }
            }
        }
    }
`;
export const GET_USERS_WITH_DELTA = gql`
    subscription checkUsersWithDelta($projectId: uuid!) {
        users: all_session_counts_views_delta(
            distinct_on: ipaddress
            where: { pid: { _eq: $projectId } }
        ) {
            delta
            count
        }
    }
`;

export const GET_SESSIONS_WITH_DELTA = gql`
    subscription checkSessionsWithDelta($projectId: uuid!) {
        sessions: all_session_counts_views_delta(
            where: { pid: { _eq: $projectId } }
        ) {
            date
            delta
            count
            pid
        }
    }
`;
