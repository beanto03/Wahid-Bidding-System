import static com.mongodb.client.model.Filters.eq;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class QuickStart {
    public static void main( String[] args ) {

        //mvn compile exec:java -Dexec.mainClass="com.mongodb.quickstart.Connection" -Dmongodb.uri="mongodb+srv://beanto03:B%40s0000@cluster0.vp7na.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

        try {
            String uri = "mongodb+srv://beanto03:B%40s00003@cluster0.mongodb.net/Cluster0?retryWrites=true&w=majority";
            MongoClient mongoClient = MongoClients.create(uri);
            MongoDatabase database = mongoClient.getDatabase("<database>");
            System.out.println("Connection to MongoDB established.");
        } catch (Exception e) {
            System.out.println("Connection failed: " + e.getMessage());
        }

        // Replace the placeholder with your MongoDB deployment's connection string
        String uri = "mongodb+srv://beanto03:B%40s00003@cluster0.vp7na.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            Document doc = collection.find(eq("title", "Back to the Future")).first();
            if (doc != null) {
                System.out.println(doc.toJson());
            } else {
                System.out.println("No matching documents found.");
            }
        }
    }
}