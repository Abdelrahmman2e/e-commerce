module.exports = class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  filter() {
    const queryStringObj = { ...this.queryString };
    const skipFields = ["limit", "page", "fields", "sort", "keyword"];
    skipFields.forEach((field) => delete queryStringObj[field]);
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortFields = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortFields);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }

    return this;
  }

  fieldsLimit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");

      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if(modelName =="Product")
      {query.$or = [
        { title: { $regex: this.queryString.keyword, $options: "i" } },
        { description: { $regex: this.queryString.keyword, $options: "i" } },
        
      ]}else{
        query={name:{ $regex: this.queryString.keyword, $options: "i" }}
      }
      
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }

  paginate(docsCount) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const endIdx=page*limit;

    const pagination = {};
    pagination.currentPage=page;
    pagination.limit=limit;
    pagination.numberOfPages=Math.ceil(docsCount/limit);
    
    //Next Page
    if(endIdx<docsCount){
      pagination.Next=page+1;
    }

    //Previous Page

    if(skip>0){
      pagination.Pre=page-1
    }

    this.mongooseQuery = this.mongooseQuery
    .limit(limit)
    .skip(skip)
    

    this.ResultPagination=pagination;
    
    return this;
  }
};
