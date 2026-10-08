/**
 * Renders a schema.org JSON-LD block.
 *
 * `JSON.stringify` output can legally contain `</script>`, so `<` is escaped
 * to avoid breaking out of the script element.
 */
export default function JsonLd({ data, id }) {
	if (!data) return null;

	return (
		<script
			id={id}
			type='application/ld+json'
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data).replace(/</g, '\\u003c'),
			}}
		/>
	);
}
