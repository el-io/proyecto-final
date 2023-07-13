const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      menuItems: [
      
        {
          id: 1,
          title: 'Productos',
          url: 'productos.html',
        },
        {
          id: 2,
          title: 'Contacto',
          url: 'contacto.html',
        },
        {
          id: 3,
          title: 'Quienes Somos',
          url: 'about.html',
        },
        {
          id: 4,
          title: 'mantenimiento',
          url: 'owner.html',
        },
      ],
      isMobile: false,
      showMenu: false,
      isMenuOpen: false,
    };
  },
  methods: {
    openMenu() {
      this.isMenuOpen = true;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  template: `
  <nav>

    <ul>
        <li v-if="isMobile" class="dropdown">
            <a class="dropbtn" @mouseenter="openMenu" @click="closeMenu">Menú</a>
          
                <ul class="dropdown-content" :class="{ 'show': isMenuOpen }" @mouseenter="openMenu" @mouseleave="closeMenu">
                     <li v-for="item in menuItems" :key="item.id">
                       <a :href="item.url">{{ item.title }}</a>
                     </li>
                </ul>
         
        </li>
        <li v-else v-for="item in menuItems" :key="item.id" :class="{ 'hide-on-mobile': showMenu }">
            <a :href="item.url">{{ item.title }}</a>
        </li>
    </ul>
</nav>

  `, 
  mounted() {
    this.updateMenuBasedOnWindowSize();
    window.addEventListener("resize", this.updateMenuBasedOnWindowSize);
},
methods: {
    updateMenuBasedOnWindowSize() {
        this.isMobile = window.innerWidth <= 768;
    },
},
});

app.mount('#app');


      