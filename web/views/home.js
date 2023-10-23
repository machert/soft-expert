export default {
    name: 'Home',

    setup() {
        const title = 'Soft Expert'
        return {title}
    },

    template: `
        <div>
            {{ title }}
        </div>
    `,
  };