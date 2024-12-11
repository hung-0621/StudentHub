# StudentHub

## 安裝與執行指引

### 1. 安裝Docker, MongoDB Compass

提供資料庫運行環境，載點：

[Docker desktop](https://www.docker.com/products/docker-desktop/)

[MongoDB Compass](https://www.mongodb.com/try/download/shell)

### 2. 使用Docker鏡像運行MongoDB

1. pull mongodb docker 映像檔  
    ```

    docker pull mongodb/mongodb-community-server:latest

    ```

2. 讓映像作為container運行  
    ```

    docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest

    ```

3. 檢查是否正在運行
    ```

    docker container ls

    ```


### 3. 打開 MongoDB Compass，連接MongoDB

![image](https://github.com/hung-0621/StudentHub/blob/main/images/DB_connect.png)

### 4. 建立database，創建collection "studentslists"

請按照以下格式建立：

```

{

    _id: ObjectId('673ea0ddc90260dd5142dbd5'),

    userName: 'tkuee0787',

    sid: 1,

    name: '測試',

    department: '電機工程系',

    grade: '四年級',

    class: 'A',

    Email: 'tkuee0787@tkuim.com',

    absences: 4

}

```

### 5. clone專案到本地

打開終端機運行：

```

cd (你想放專案的地方)

git clone https://github.com/hung-0621/StudentHub.git

```

### 6. 設定.env

開啟VScode並複製/backend/.env.example改成.env，並設定相關數值。

![image](https://github.com/hung-0621/StudentHub/blob/main/images/env_setting.png)

  
### 7. 運行後端

>[!NOTE]
>若有需要可運行npm audit fix自動嘗試修復檢測到的安全問題

```

cd backend

npm i

# npm audit fix

npm run dev

```

### 8. 運行前端

>[!NOTE]
>若有需要可運行npm audit fix自動嘗試修復檢測到的安全問題

```

cd frontend

npm i

# npm audit fix

npm run dev

```

## API規格說明

### findAll
說明：取得所有學生資訊  

#### UserService.ts:  
`public async getAllStudents(): Promise<Array<DBResp<Student>> | undefined>` 

#### request  
`GET http://DBHOST:PORT/api/v1/user/findAll`

#### respond  
- code 200 :

    ```

    {
        "code": 200,
        "message": "Find success",
        "body": [
            {
                "_id": "673ea0ddc90260dd5142dbd5",
                "userName": "tkuee0787",
                "sid": "1",
                "name": "測試1",
                "department": "電機工程系",
                "grade": "四年級",
                "class": "A",
                "Email": "tkuee0787@tkuim.com",
                "absences": 4
            },
            {
                "_id": "673ea0ddc90260dd5142dbd6",
                "userName": "tkubm9553",
                "sid": "2",
                "name": "測試2",
                "department": "企業管理系",
                "grade": "二年級",
                "class": "A",
                "Email": "tkubm9553@tkuim.com",
                "absences": 0
            }
        ]
    }

    ```
- code 500:  
    ```

    {
        "code": 500,
        "message": "server error"
    }

    ```
---
### insertOne
說明：加入一筆學生資訊
#### UserService.ts
 `public async insertOne(info: Student): Promise<resp<DBResp<Student> | undefined>>`
#### request
`POST http://DBHOST:PORT/api/v1/user/insertOne`
- request body ex:
    ```

    {
        "userName": "tkuim0123",
        "name": "test",
        "department": "財經系",
        "grade": "2",
        "class": "A",
        "Email": "tkuim0123@tkuim.com",
        "absences": 2
    }

    ```
#### respond
- code 200
    ```

    {
        "code": 200,
        "message": "",
        "body": {
            "userName": "tkuim0123",
            "sid": "51",
            "name": "test",
            "department": "財經系",
            "grade": "2",
            "class": "A",
            "Email": "tkuim0123@tkuim.com",
            "absences": 2,
            "_id": "675936fed525f70fd0eb7286",
            "__v": 0
        }
    }

    ```
- code 403
    ```

    {
        "code": 403,
        "message": 
        | "學生名字格式不正確，應為 tku + 科系縮寫 + 四碼座號，例如: tkubm1760"
        | "座號已存在"
        | "校名必須為 tku"
        | "座號格式不正確，必須為四位數字。"
    }

    ```
- code 500
    ```

    {
        "code": 500,
        "message": "server error"
    }

    ```
---
### deleteBySid
說明：透過學生座號，刪除學生資料
#### UserService.ts
`public async deleteBySid(sid: string)`
#### request
`DELETE http://DBHOST:PORT/api/v1/user/deleteBySid`
- request body ex:
    ```
    {
        "sid":"tkuim0123"
    }
    ```
#### respond
- code 200
    ```
    {
        "code": 200,
        "message": "success",
        "body": {
            "acknowledged": true,
            "deletedCount": 1
        }
    }
    ```
- code 500 (error)視情況而定
```
{
    "code": 500,
    "message": (error),
}
```
---
### update_Student_By_UserName
說明：透過學生帳號，更新學生相關資訊
#### UserService.ts
`public async update_Student_By_UserName(info: Student)`
#### request
`PUT http://DBHOST:PORT/api/v1/user/update_Student_By_UserName`
- request body ex:
    ```

    {
        "userName": "tkuim0123",
        "name": "TEST",
        "department": "財經系",
        "grade": "一年級",
        "class": "A",
        "Email": "tkuim0123@tkuim.com",
        "absences": 5
    }

    ```

#### respond
- code 200
    ```

    {
        "code": 200,
        "message": "update success",
        "body": {
            "_id": "67594b338b763e6a6fa719ae",
            "userName": "tkuim0123",
            "sid": "51",
            "name": "TEST",
            "department": "財經系",
            "grade": "一年級",
            "class": "A",
            "Email": "tkuim0123@tkuim.com",
            "absences": 5,
            "__v": 0
        }
    }

    ```
- code 400  
    ```

    {
        "code": 400,
        "message": "Invalid input: ${key} is missing or undefined"
    }

    ```
- code 404  
    ```

    {
        "code": 404,
        "message": "user not found"
    }

    ```
- code 500 (error)視情況而定
    ```

    {
        "code": 500,
        "message": (error)
    }

    ```
## 架構圖

![架構圖](https://github.com/hung-0621/StudentHub/blob/main/images/System_Architecture.png)

## 流程圖
<img src="https://github.com/hung-0621/StudentHub/blob/main/images/find.png" width="500" alt="查找學生">  
<img src="https://github.com/hung-0621/StudentHub/blob/main/images/create.png" width="500" alt="新增學生">  
<img src="https://github.com/hung-0621/StudentHub/blob/main/images/update.png" width="500" alt="更新學生">  
<img src="https://github.com/hung-0621/StudentHub/blob/main/images/delete.png" width="500" alt="刪除學生">  

## demo
[網站介紹影片](https://youtu.be/HZ-TwEFwLME?si=etCJlGsmQT-pj7Tx)