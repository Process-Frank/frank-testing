export const generateLoader = (container, clazz, attributes, size) => {
  let x = '';

  size = size || 48;

  if(container) x += `<div class="o-loader__container ${clazz?clazz:''}" ${attributes?attributes:''}>`;

  x += `
    <span class="o-loader">
      <svg width="${size}" height="${size}" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="3">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
            <path id="loader-path" d="M36 18c0-9.94-8.06-18-18-18"></path>
          </g>
        </g>
      </svg>
    </span>
  `;

  if(container) x += `</div>`;
  return x;
};
