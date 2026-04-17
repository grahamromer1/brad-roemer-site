/**
 * Renders rendered-markdown HTML with prose styles that match the rest of
 * the site. See the `.post-body` rules in globals.css for the actual
 * element-level typography.
 */
export default function PostBody({ html }: { html: string }) {
  return (
    <div
      className="post-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
