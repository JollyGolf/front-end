const REST_API = { 
  заказать по адресу 1 = () => запрос на результат 1,
  заказать по адресу 2 = () => запрос на результат 2,
  заказать по адресу 3 = () => запрос на результат 3
}

const GraphQL = {
  передаем все 3 адреса = () => {
  	запрос на результат 1,
  	запрос на результат 2,
  	запрос на результат 3
  }
}

let GraphQL = {
  schema: {
  	title: Схема,
  	example = () => {

  	}
  },
  queries: {
  	title: Запросы,
  	example = () => {
  		
  	}

  },
  resolvers: {
  	title: Распознаватели,
  	example = () => {
  	  Query: {
        post(root, args) {
          return Posts.find({ id: args.id });
        },
        description: распознаватель для поля post, помещенный в раздел Query => {
      	return получение записи в корне ответа;
      }
      }
     
  	},

  	{ delimiter: define = define => return define },

  	example = () => {
  	  Query: {
  		post(root, args) {
    	  return Posts.find({ id: args.id });
  		},
  		description: распознаватель для поля post, помещенный в раздел Query => {
      	return получение записи в корне ответа;
      }
	  },
	  Post: {
        author(post) {
          return Users.find({ id: post.authorId})
        },
        description: распознаватель для подполей, например author
      }
  	}
  }
}