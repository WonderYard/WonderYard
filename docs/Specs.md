Cellular automata are represented as JSON-like objects. A **CellularAutomaton** object describes states and rules, but it has no informations about the initial condition of the grid.


### CellularAutomaton

| Field         | Type               | Description
| --------------| ------------------ | -----------
| states        | Array of StateDefn | -
| nbhds         | Array of NbhdDefn  | -
| classes       | Array of ClassDefn | -


### StateDefn

| Field      | Type               | Description
| --------   | ------------------ | -----------
| color      | String             | "#" followed by 3 or 6 hexadecimal digits.
| image      | String (URI base64)| _Optional_ Image            
| rules      | Array of Rule      | -
| class_list | Array of Integer   | -
| name       | String             | Unique

### NbhdDefn

| Field        | Type                 | Description
| ------------ | -------------------- | -----------
| rel_cells    | Array of Point       | \* List of coordinates.


### ClassDefn
| Field        | Type               | Description
| ------------ | ------------------ | -----------
| class_list   | Array of Integer   | List of state classes.
| rules        | Array of Rule      | -
| name         | String             | Unique

### Rule

| Field      | Type                | Description
| ---------- | ------------------  | -----------
| evolve_to  | StateRef            | -
| conditions | Expression          | -


### Expression

| Field      | Type               | Description
| ---------- | ------------------ | -----------
| term       | ExTerm             | _Optional_.\*
| subexp     | Subexpression      | _Optional_.\*
| negate     | True               | _Optional_. Logical negation of condition.

\* Exactly **one** of the marked fields can be present.


### Subexpression

| Field       | Type               | Description
| ----------  | ------------------ | -----------
| operator    | String             | Boolean operator
| right_chd   | Expression         | -
| left_chd    | Expression         | -


### Condition

| Field      | Type       | Description
| ---------- | ---------- | -----------
| adjacency  | Adjacency  | _Optional_.\*
| relational | Relational | _Optional_.\*

\* Exactly **one** of the marked fields can be present.


### ExTerm

| Field      | Type            | Description
| ---------- | --------------- | -----------
| cond       | Condition       | _Optional_.\*
| bool_lit   | (True or False) | _Optional_.\*


### Adjacency

| Field        | Type         | Description
| ------------ | ------------ | -----------
| ref_to_count | Ref          | -
| in           | Neighborhood | _Optional_. Default to Moore neighborhood.
| min          | Integer      | -
| max          | Integer      | _Optional_. Default to +Infinity.


### Relational

| Field     | Type     | Description
| --------- | -------- | -----------
| state_ref | StateRef | -
| other_ref | Ref      | -


### Ref

| Field     | Type     | Description
| --------- | -------- | -----------
| state_ref | StateRef | _Optional_.\*
| class_ref | Integer  | _Optional_.\* Class identifier.

\* Exactly **one** of the marked fields can be present.


### StateRef

| Field       | Type    | Description
| ----------- | ------- | -----------
| state_id    | String  | _Optional_.\* Refers to a specific state.
| me          | True    | _Optional_.\* Refers to self.
| coordinate  | Point   | _Optional_.\* Refers to a relative cell in the grid.

\* Exactly **one** of the marked fields can be present.


### Neighborhood

| Field        | Type                 | Description
| ------------ | -------------------- | -----------
| nbhd_id      | Integer              | _Optional_.\* Neighborhood identifier.
| rel_cells    | Array of Point       | _Optional_.\* List of coordinates.
| name         | String               | Unique

\* Exactly **one** of the marked fields can be present.


### Point
| Field        | Type                 | Description
| ------------ | -------------------- | -----------
| x            | Integer              | 
| y            | Integer              |

