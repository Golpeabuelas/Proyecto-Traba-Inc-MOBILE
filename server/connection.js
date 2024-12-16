import { createClient } from "@libsql/client"

const connection = createClient({
    url: 'libsql://traba-inc-golpeabuelas.aws-us-east-1.turso.io',
    authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzM5NjMwOTAsImlkIjoiNmIzMjQ3OTktMDdiNy00N2QzLWI3NzQtNjAwZWIyNzY1YWUzIn0.BVtF6qV_usqc_no9I1zIDp_srmZ6f2LoarOl-Y8168nYSMh3Htr6H0BGP294lWigDv5aU2S_Dk7QITYRKhbCCA'
})

export default connection