import { Helmet } from 'react-helmet'

const SEO = ({ title = 'GAIA', desc = '' }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={desc} />
  </Helmet>
)

export default SEO
