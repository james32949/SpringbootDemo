package com.redis;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedisTest {

	@Autowired
	StringRedisTemplate StringRedisTemplast;

	// 測試
	@GetMapping("/HelloRedis")
	public String count() {

		Long HelloRedis = StringRedisTemplast.opsForValue().increment("HelloRedis");

		return "訪問次數:" + HelloRedis;
	}

	@GetMapping("/TestRedis")
	public String setTest() {
		// 寫入Key-Value
		StringRedisTemplast.boundValueOps("測試").set("測試用數居");
		// 根據Key值設定存活時間
//		StringRedisTemplast.expire("測試", 1, TimeUnit.MINUTES);

		// 設定Key-Value時同時設定存活時間
		StringRedisTemplast.opsForValue().set("測試2", "晚餐吃什麼??", 1, TimeUnit.MINUTES);

		return StringRedisTemplast.opsForValue().get("測試2");
	}
	

}
